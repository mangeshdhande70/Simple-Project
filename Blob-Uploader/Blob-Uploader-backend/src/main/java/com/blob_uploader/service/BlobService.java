package com.blob_uploader.service;

import com.blob_uploader.entity.BlobData;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;

public interface BlobService {

    public String putBlob(JSONObject jsonObject);

    public List<BlobData> getAllBlobData();

}
