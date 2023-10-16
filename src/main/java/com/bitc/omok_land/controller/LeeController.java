package com.bitc.omok_land.controller;

import com.bitc.omok_land.service.LeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.util.Arrays;
@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/server")
public class LeeController {

//    private final LeeService leeService;
    InetAddress ip = null;
    InetAddress[] ipArr = null;

//    @RequestMapping(value = "/test", method = RequestMethod.GET)
//    public void test() throws Exception {
//        System.out.println("test success");
//    }

    @RequestMapping(value = "/getIp", method = RequestMethod.GET)
    public String getIp() throws Exception {
//        try {
//            // 도메인명(host)을 통해서 IP주소를 반환합니다.
//            ip = InetAddress.getByName("www.google.com");
//            // 호스트의 이름을 반환합니다.
//            // www.google.com
//            System.out.println(ip.getHostName());
//            // 호스트의 IP주소를 반환합니다.
//            // 142.250.76.132
//            System.out.println(ip.getHostAddress());
//            // 호스트의 이름과 IP주소를 반환합니다.
//            // www.google.com/142.250.76.132
//            System.out.println(ip.toString());
//
//            // IP주소를 byte 배열로 반환합니다.
//            byte[] ipAddr = ip.getAddress();
//            // [-114, -6, 76, -124]
//            System.out.println(Arrays.toString(ipAddr));
//
//        }
//        catch (Exception e) {
//            e.printStackTrace();
//        }

        try {
            // 로컬 host의 IP주소를 반환합니다.
            ip = InetAddress.getLocalHost();

            System.out.println(ip.getHostName());
            // ex. 192.168.1.164
            System.out.println(ip.getHostAddress());
            System.out.println();

            return ip.getHostAddress();
        }
        catch (Exception e) {
            e.printStackTrace();
        }

//        try {
//            // 도메인명(host)에 지정된 모든 호스트의 IP주소를 배열에 담아서 반환합니다.
//            ipArr = InetAddress.getAllByName("www.naver.com");
//
//            // ipArr[0] :www.naver.com/223.130.200.104
//            // ipArr[1] :www.naver.com/223.130.200.107
//            for (int i = 0; i < ipArr.length; i++) {
//                System.out.println("ipArr[" + i + "] :" + ipArr[i]);
//            }
//        }
//        catch (Exception e) {
//            e.printStackTrace();
//        }
        return null;
    }

}
