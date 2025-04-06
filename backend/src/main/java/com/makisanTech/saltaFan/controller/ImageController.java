package com.makisanTech.saltaFan.controller;

import com.makisanTech.saltaFan.model.Image;
import com.makisanTech.saltaFan.service.CloudinaryService;
import com.makisanTech.saltaFan.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("image")
public class ImageController {
    @Autowired
    CloudinaryService cloudinaryService;

    @Autowired
    ImageService imageService;

    @GetMapping("/")
    public ResponseEntity<List<Image>> list() {
        List<Image> list = imageService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);

    }

    @GetMapping("/{fileId}")
    public ResponseEntity<?> getImagen(@PathVariable Long fileId) throws IOException {
        Image imageData = imageService.getImage(fileId).get();
        return ResponseEntity.status(HttpStatus.OK).body(imageData);
    }

    @PostMapping("/")
    public ResponseEntity<?> upload(@RequestParam("image") MultipartFile multipartFile) throws IOException {
        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if (bi == null) {
            return new ResponseEntity<>("imagen no válida", HttpStatus.BAD_REQUEST);
        }

        // se puede cambiar por un Dto "ImageResponseDto" para seguir el patrón
        Image imagen = imageService.save(multipartFile);

        return new ResponseEntity<>(imagen, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws IOException {
        if (!imageService.exists(id))
            return new ResponseEntity<>("no existe", HttpStatus.NOT_FOUND);
        Image imagen = imageService.getImage(id).get();
        cloudinaryService.delete(imagen.getCloudinaryId());
        imageService.delete(id);
        return new ResponseEntity<>("imagen eliminada", HttpStatus.OK);
    }
}
