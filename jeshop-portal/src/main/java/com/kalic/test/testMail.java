package com.kalic.test;

import com.sun.mail.util.MailSSLSocketFactory;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class testMail {
    public static void main(String args[]) throws Exception {
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
        msg.setSubject("主题");
        StringBuilder builder = new StringBuilder();
        builder.append("激活码");
        builder.append("123213123123123123123123123122312312");
        msg.setText(builder.toString());
        msg.setFrom(new InternetAddress("1084956267@qq.com"));

        Transport transport = session.getTransport();
        transport.connect("smtp.qq.com",
                "1084956267@qq.com"
                ,
                "oqnohseedrryigje"
        );

        transport.sendMessage(msg, new Address[] { new InternetAddress(
                "18380161761@163.com"
        ) });
        transport.close();
    }
}
