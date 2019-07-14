package com.kalic.controller;

import com.kalic.pojo.Customer;
import com.kalic.pojo.CustomerInfo;
import com.kalic.service.CustomerInfoService;
import com.kalic.service.CustomerService;
import com.kalic.utils.SnowflakeIdWorker;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.Timestamp;

@RestController
public class CustomerInfoController {
    @Autowired
    private CustomerInfoService customerInfoService;
    @Autowired
    private CustomerService customerService;

    @RequestMapping("/customerInfo/getDataInfo")
    public CustomerInfo selCustomerInfoByUid(int uid){
        return customerInfoService.selCustomerInfo(uid);
    }

    @RequestMapping("/customerInfo/getCustomerData")
    public Customer selCustomerByUid(int uid){
        return customerService.selCustomerById(uid);
    }


    @RequestMapping("/customerInfo/updateOrInsert")
   public int updateOrInsertCustomerInfo(MultipartFile file, HttpServletRequest request, int uid, int index){
        //index 用来判断选择新增还是更新

        String birthstr = request.getParameter("birth");
        Timestamp birth = Timestamp.valueOf(birthstr);
        System.out.println("birth:" + birth);


        String sexstr = request.getParameter("sex");
        int sex = Integer.parseInt(sexstr);
        System.out.println("sex:" + sex);

        String encodeShopName = request.getParameter("shopName");
        System.out.println("encodShopName:" + encodeShopName);

        String shopName = null;
        try {
           shopName = URLDecoder.decode(encodeShopName, "utf-8");
        } catch (UnsupportedEncodingException e) {
            System.out.println("昵称不存在");
            e.printStackTrace();
        }
        System.out.println(shopName);

        CustomerInfo customerInfo = new CustomerInfo();
        customerInfo.setUid(uid);
        customerInfo.setBirth(birth);
        customerInfo.setSex(sex);
        customerInfo.setShopName(shopName);

        System.out.println("customerInfo:" + customerInfo);

        String imgSrc = fileupload(file, request);
        System.out.println("图片地址:" + imgSrc);

        customerInfo.setHeadSculpture(imgSrc);

        if (index == 1){
            //index == 1 说明该用户是一个新用户 没有 信息， 需要新增
            System.out.println("新增用户信息");
            return customerInfoService.insCustomerInfo(customerInfo);
        }else{
            // 对用户信息进行修改
            System.out.println("修改用户信息");
            return customerInfoService.updCustomerInfo(customerInfo);
        }
   }


   public String fileupload(MultipartFile img, HttpServletRequest request){
        String src  = null;
       String fileName = img.getOriginalFilename();
       System.out.println("文件名称：" + fileName);

       String suffix=fileName.substring(fileName.lastIndexOf(".")+1);
       long random = new SnowflakeIdWorker(1,1).nextId();
       String newFileName = random + "." + suffix;

       ServletContext sc = request.getSession().getServletContext();
       //设定文件保存路径
       String path = sc.getRealPath("/files") + "/";

       System.out.println("path:" + path);

       //----------------------文件上传----------------------
/*
       File file = new File(path);

       //判断路径是否存在，不存在就创建, 返回true 则不存在
       if (!file.exists()){
           file.mkdir();
       }
*/

       //判断上传文件是否为null
       if (!img.isEmpty()){
           try {

               FileUtils.copyInputStreamToFile(img.getInputStream(), new File(path + newFileName));

               /*FileOutputStream outputStream = new FileOutputStream(path + newFileName);
               InputStream inputStream =  img.getInputStream();

               int index;
               if ((index = inputStream.read()) != -1){
                   outputStream.write(index);
               }

               inputStream.close();
               outputStream.close();*/
           } catch (FileNotFoundException e) {
               e.printStackTrace();
           } catch (IOException e) {
               e.printStackTrace();
           }
       }

       String  imgsrc = "/jeshop/files/" + newFileName;
       System.out.println(imgsrc);
       return imgsrc;
   }

}
