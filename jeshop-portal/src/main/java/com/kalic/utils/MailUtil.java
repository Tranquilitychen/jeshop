package com.kalic.utils;


import com.sun.mail.util.MailSSLSocketFactory;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.util.Properties;

public class MailUtil {

    public void  sendEmail(String email, String code) throws GeneralSecurityException, MessagingException {
        Properties props = new Properties();

        // 开启debug调试
        props.setProperty("mail.debug", "true");
        // 发送服务器需要身份验证
        props.setProperty("mail.smtp.auth", "true");
        // 设置邮件服务器主机名
        props.setProperty("mail.host", "smtp.qq.com");
        // 发送邮件协议名称
        props.setProperty("mail.transport.protocol", "smtp");

        MailSSLSocketFactory sf = new MailSSLSocketFactory();
        sf.setTrustAllHosts(true);
        props.put("mail.smtp.ssl.enable", "true");
        props.put("mail.smtp.ssl.socketFactory", sf);

        Session session = Session.getInstance(props);

        Message msg = new MimeMessage(session);
        msg.setSubject("JeShop用户邮箱激活");

      /*  StringBuilder builder = new StringBuilder();
        builder.append("点击下面链接激活账号，48小时生效，否则重新注册账号，链接只能使用一次，请尽快激活！<br>");
        builder.append(url + code);
        msg.setText(builder.toString());*/

        String url = "http://localhost:81/jeshop/customer/processActive?email=" + email + "&activeCode=" + code;   //验证地址

        msg.setContent("<html lang='zh-CN'><head ><meta charset='utf-8'>"
                        + "</head><body>内容：JeShop用户邮箱激活<br/>"
                        + "点击下面链接激活账号，48小时生效，否则重新注册账号，链接只能使用一次，请尽快激活！<br>"
                        + "<a href='" + url + "'>" + url + "</a></body></html>",
                "text/html;charset=utf-8");


        msg.setFrom(new InternetAddress("xxx@qq.com"));

        Transport transport = session.getTransport();
        transport.connect("smtp.qq.com",
                "xxx@qq.com"
                ,
                "您的邮箱授权码"
        );

        transport.sendMessage(msg, new Address[] { new InternetAddress(email) });
        transport.close();
    }

}
