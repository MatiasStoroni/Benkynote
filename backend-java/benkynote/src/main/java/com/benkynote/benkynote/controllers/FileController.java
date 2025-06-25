// package com.appbaza.nest.nestservice.core.file;

// import com.appbaza.nest.nestservice.core.file.model.FileUploadRequest;
// import com.appbaza.nest.nestservice.core.file.model.FileUploadResponse;
// import org.springframework.http.MediaType;
// import org.springframework.http.ResponseEntity;
// import org.springframework.validation.annotation.Validated;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;

// @Validated
// @RestController
// @RequestMapping("/v1/file")
// public class FileController {

//     private final FileService service;

//     public FileController(FileService service) {
//         this.service = service;
//     }

//     @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
//     public ResponseEntity<FileUploadResponse> upload(
//             @Validated @RequestParam("file") MultipartFile file,
//             @RequestParam("name") String name
//     ) {
//         FileUploadRequest fileUploadRequest = new FileUploadRequest(file, name);
//         return ResponseEntity.ok(service.upload(fileUploadRequest));
//     }