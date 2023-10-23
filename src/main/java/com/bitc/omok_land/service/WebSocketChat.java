package com.bitc.omok_land.service;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
@ServerEndpoint("/socket/chatt/{ip}")
public class WebSocketChat {
    private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());

    private static Logger logger = LoggerFactory.getLogger(WebSocketChat.class);

    private static List<String> dataList = new ArrayList<>();

    @OnOpen
    public void onOpen(Session session) throws IOException {
        System.out.println("session : " + session);

        logger.info("open session : {}, clients={}", session.toString(), clients);
        Map<String, List<String>> res = session.getRequestParameterMap();
        logger.info("res={}", res);

        if(!clients.contains(session)) {
            clients.add(session);
            if (clients.contains(session))
            logger.info("session open : {}", session);

        }
        else {
            logger.info("이미 연결된 session");
        }

    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        logger.info("receive message : {}", message);
        dataList.add(message);
        System.out.println(dataList);
        for (Session s : clients) {
            logger.info("send data : {}", message);
            s.getBasicRemote().sendText(message);
        }
    }

    @OnClose
    public void onClose(Session session) throws IOException {
        logger.info("session close : {}", session);
        clients.remove(session);
    }
}