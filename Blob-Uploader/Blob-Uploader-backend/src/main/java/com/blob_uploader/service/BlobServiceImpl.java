package com.blob_uploader.service;

import com.blob_uploader.entity.BlobData;
import com.blob_uploader.repository.BlobRepository;
import com.blob_uploader.utils.DataMapper;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class BlobServiceImpl implements BlobService {

    private BlobRepository userRepository;

    @Autowired
    public BlobServiceImpl(BlobRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public String putBlob(JSONObject jsonObject) {
        BlobData blobData = DataMapper.mapToBlobData(jsonObject);
        return userRepository.save(blobData).getId();
    }

    @Override
    public List<BlobData> getAllBlobData() {
        List<BlobData> listOfBlob = userRepository.findAll();
        log.info("listOfBlob {}",listOfBlob);
        return listOfBlob;
    }
}
