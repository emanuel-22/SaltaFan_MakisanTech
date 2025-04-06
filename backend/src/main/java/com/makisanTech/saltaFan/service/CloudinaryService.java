package com.makisanTech.saltaFan.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryService {

    Cloudinary cloudinary;

    private Map<String, String> valuesMap = new HashMap<>();

    public CloudinaryService() {
        valuesMap.put("cloud_name", System.getenv("CLOUDINARY_CLOUD_NAME"));
        valuesMap.put("api_key", System.getenv("CLOUDINARY_API_KEY"));
        valuesMap.put("api_secret", System.getenv("CLOUDINARY_API_SECRET"));
        cloudinary = new Cloudinary(valuesMap);
    }


    public Map<?,?> upload(MultipartFile multipartFile) throws IOException {
        try {
            File file = convert(multipartFile);
            Map<?, ?> result = cloudinary.uploader().upload(file, ObjectUtils.asMap("folder", "images/"));
            return result;
        } catch (IOException e){
            e.printStackTrace();
            return null;
        }
    }

    public Map<?,?> delete(String id) throws IOException {
        Map<?,?> result = cloudinary.uploader().destroy(id, ObjectUtils.emptyMap());
        return result;
    }

    private File convert(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        FileOutputStream fo = new FileOutputStream(file);
        fo.write(multipartFile.getBytes());
        fo.close();
        return file;
    }
}
