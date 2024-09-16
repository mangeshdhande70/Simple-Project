package com.blob_uploader.controller;

import com.blob_uploader.dto.BlobDataDto;
import com.blob_uploader.entity.BlobData;
import com.blob_uploader.service.BlobService;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/blob")
@Slf4j
public class BlobController {

    private BlobService blobService;

    @Autowired
    public BlobController(BlobService blobService){
        this.blobService = blobService;
    }

    @PostMapping(value = "/post")
    public ResponseEntity<String> saveBlob(@RequestBody String payload){
        log.info("payload {}",payload);
        JSONObject jsonObject = new JSONObject(payload);
        log.info("jsonObject {}",jsonObject);
        log.info("request for save blob with fileName {}",jsonObject.optString("fileName"));
       String id  = blobService.putBlob(jsonObject);
       return new ResponseEntity<>(id,HttpStatus.CREATED);
    }

    @GetMapping(value = "/getAllBlob")
    public ResponseEntity<List<BlobData>> getAllBlob(){
        log.info("request for get all blob");
        List<BlobData> response = blobService.getAllBlobData();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

}
