package com.blob_uploader.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class BlobDataDto {

    private String fileName;
    private String fileLink;

}
