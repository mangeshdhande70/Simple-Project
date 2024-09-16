package com.blob_uploader.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "blob_data")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class BlobData {

    @Id
    private String id;

    @Column(name = "fileName")
    private String fileName;

    @Column(name = "fileLink")
    private String fileLink;

}
