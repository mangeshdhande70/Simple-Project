package com.blob_uploader.utils;

import com.blob_uploader.entity.BlobData;
import org.json.JSONObject;

import java.util.UUID;

public class DataMapper {


    public static BlobData mapToBlobData(JSONObject jsonObject){

        return BlobData.builder().id(UUID.randomUUID().toString())
                .fileLink(jsonObject.optString("fileUrl"))
                .fileName(jsonObject.optString("fileName")).build();
    }

    public static JSONObject mapToJsonObjectFromBlobData(BlobData blobData){
        return new JSONObject(blobData);
    }


}
