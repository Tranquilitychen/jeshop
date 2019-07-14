package com.kalic.test;

import com.kalic.utils.MailUtil;

import javax.mail.MessagingException;
import java.security.GeneralSecurityException;
import java.sql.Timestamp;
import java.util.UUID;



public class test2 {



    public  static  void  main(String args[]) {
        String fileName = "我是文件.jsp";
        System.out.println(fileName);
        //获得.的位置，然后从这里开始截取字符串到结尾
        String suffix=fileName.substring(fileName.lastIndexOf(".")+1);
        System.out.println("methodOne."+suffix);

/*        String time= "1777-01-15 08:00:00";
        Timestamp timestamp = Timestamp.valueOf(time);
        System.out.println(timestamp);*/

   /*     String activecode = UUID.randomUUID().toString().replace("-", "");
        System.out.println(activecode);
        try {
            new MailUtil().sendEmail("18380161761@163.com", activecode);
        } catch (GeneralSecurityException e) {
            System.out.println("发送失败");
            e.printStackTrace();
        } catch (MessagingException e) {
            System.out.println("发送失败");
            e.printStackTrace();
        }*/

/*        Timestamp a = Timestamp.valueOf("2018-05-18 09:32:34");
        Timestamp b = Timestamp.valueOf("2018-05-18 09:32:36");

        Long time = Long.valueOf(172800000);
        System.out.println(time);

        long c  = (b.getTime() - a.getTime()) - time;
        System.out.println(c);*/


    }
}
