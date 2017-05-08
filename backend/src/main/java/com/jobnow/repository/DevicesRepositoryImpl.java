package com.jobnow.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobnow.controller.ExpectedException;
import com.jobnow.entity.Account;
import com.jobnow.entity.Bet;
import com.jobnow.entity.Device;
import com.jobnow.entity.Order;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by codex on 03.03.17.
 */

@Repository("devicesRepository")
public class DevicesRepositoryImpl implements DevicesRepository<Device> {

    @Autowired
    protected JdbcOperations jdbcOperations;

    @Value("${fcm.key}")
    private String fcmKey;

    @Autowired
    @Qualifier("orderRepository")
    private OrderRepository orderRepository;

    @Autowired
    @Qualifier("userRepository")
    private UserRepository userRepository;

    @Override
    public void create(Device device) throws ExpectedException {
        jdbcOperations.update("INSERT INTO devices (user_id, token) VALUES (?, ?);",
                device.getUserId(), device.getToken());
    }

    @Override
    public void delete(Device device) throws ExpectedException {
        jdbcOperations.update("DELETE FROM devices WHERE user_id = ? AND token = ?;",
                device.getUserId(), device.getToken());
    }

    private void sendNotification(String title, String text, String type, Long orderId, List<String> deviceTokens) throws JsonProcessingException {
        HashMap notification = new HashMap();
        notification.put("title", title);
        notification.put("text", text);
        notification.put("sound", "default");

        HashMap data = new HashMap();
        data.put("type", type);
        data.put("orderId", orderId);

        HashMap result = new HashMap();
        result.put("data", data);
        result.put("notification", notification);
        result.put("registration_ids", deviceTokens);

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(result);

        try {
            HttpResponse<JsonNode> response = Unirest.post("https://fcm.googleapis.com/fcm/send")
                    .header("Authorization", "key=" + fcmKey)
                    .header("Content-Type", "application/json")
                    .body(json)
                    .asJson();
        } catch (UnirestException e) {
            e.printStackTrace();
        }
    }

    @Override
    public int sendNotificationsNewOrder(Order order) throws JsonProcessingException {
        String title = "Появилась новая работа";
        String text = "Заказ «" + order.getName() + "»";
        String type = "new_order";

        long categoryId = order.getCategoryId();
        List<Integer> users = jdbcOperations.queryForList("SELECT user_id FROM subscriptions WHERE category_id = ?;",
                new Object[]{categoryId}, Integer.class);
        List<String> deviceTokens = new ArrayList<>();
        for (int userId : users) {
            List<String> devicesForUser = jdbcOperations.queryForList("SELECT token FROM devices WHERE user_id = ?;",
                    new Object[]{userId}, String.class);
            deviceTokens.addAll(devicesForUser);
        }
        sendNotification(title, text, type, order.getId(), deviceTokens);
        return users.size();
    }

    @Override
    public void sendNotificationsNewProposal(Bet bet) throws ExpectedException, JsonProcessingException {
        long orderId = bet.getOrderId();
        Order order = orderRepository.getById(orderId);
        Account userFrom = userRepository.get(bet.getUserId());
        String title = "Заказ «" + order.getName() + "»";
        String text = "Новое предложение от " + userFrom.getGivenName() + " " + userFrom.getFamilyName();
        String type = "new_proposal";

        long userToId = order.getUserId();
        List<String> deviceTokens = jdbcOperations.queryForList("SELECT token FROM devices WHERE user_id = ?;",
                new Object[]{userToId}, String.class);

        sendNotification(title, text, type, orderId, deviceTokens);
    }
}