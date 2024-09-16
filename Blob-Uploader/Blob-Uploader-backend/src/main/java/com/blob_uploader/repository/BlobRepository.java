package com.blob_uploader.repository;

import com.blob_uploader.entity.BlobData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlobRepository extends JpaRepository<BlobData,String> {
}
