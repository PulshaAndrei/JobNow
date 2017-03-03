package com.jobnow.repository;

import com.jobnow.entity.Order;
import org.springframework.stereotype.Repository;

/**
 * Created by codex on 03.03.17.
 */

@Repository("orderRepository")
public class OrderRepositoryImpl implements OrderRepository<Order>  {

}
