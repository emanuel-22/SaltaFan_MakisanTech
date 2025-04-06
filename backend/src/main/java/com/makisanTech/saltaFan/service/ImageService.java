package com.makisanTech.saltaFan.service;

import com.makisanTech.saltaFan.model.Image;
import com.makisanTech.saltaFan.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class ImageService {

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    CloudinaryService cloudinaryService;

    public Optional<Image> getImage(Long id){
        return imageRepository.findById(id);
    }

    public Image save(MultipartFile multipartFile) throws IOException{

        Map<?,?> result = cloudinaryService.upload(multipartFile);
        Image image = new Image();
        image.setName((String) result.get("original_filename"));
        image.setUrl((String) result.get("url"));
        image.setCloudinaryId((String) result.get("public_id"));

        return imageRepository.save(image);
    }

    public void delete(Long id){
        imageRepository.deleteById(id);
    }

    public boolean exists(Long id){
        return imageRepository.existsById(id);
    }


    public List<Image> list(){
        return imageRepository.findByOrderById();
    }

}
