/**
 *위키 주소 https://wiki.uracle.co.kr/madp/client/api
 *
 */
(function () {
  $.imagePicker = function () {
    // image를 가져오는 api
    // M.media.picker
    return new Promise((resolve) => {
      M.media.picker({
        mode: 'SINGLE',
        media: 'PHOTO',
        // path: '/media',
        // path를 넘기지 않아야 공용 라이브러리를 바라봄.
        column: 3,
        callback(status, result) {
          resolve({ status, result });
        },
      });
    });
  };

  $.img2base64 = function (path) {
    // 가져온 api를 base64 변환
    // M.file.read
    return new Promise((resolve) => {
      M.file.read({
        path,
        encoding: 'BASE64',
        indicator: true,
        callback(status, result) {
          resolve({ status, result });
          // var imgView = document.getElementById('imageView');
          // //mime-type은 별도로 스크립트에서 지정 필요
          // imgView.src = 'data:image/png;base64,' + result.data;
        },
      });
    });
  };

  $.uploadImage = function (path, onProgress) {
    // image를 업로드
    // M.net.http.upload
    return new Promise((resolve) => {
      M.net.http.upload({
        url: 'http://10.0.2.2:3000/file/upload',
        header: {},
        params: {},
        body: [{ name: 'file', content: path, type: 'FILE' }],
        encoding: 'UTF-8',
        finish(status, header, body, setting) {
          resolve({
            status,
            header,
            body,
            setting,
          });
        },
        progress(total, current) {
          if (onProgress) onProgress(total, current);
        },
      });
    });
  };

  $.getCurrentLocation = function () {
    return new Promise((resolve) => {
      M.plugin('location').current({
        timeout: 10000,
        maximumAge: 1,
        callback(result) {
          resolve(result);
        },
      });
  });
  };
})();