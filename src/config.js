const defaultHost = 'http://localhost:3003/';
const defaultProcessPath = 'http://192.168.64.98:9081/blc/';
/* eslint-disable */
const Config = {
  Host: baseUrl || defaultHost,
  ProcessPath: baseProcessUrl || defaultProcessPath
};

const CustomConfig = {
  ImageHost: 'http://img.izirong.com/',
  ImageBkt: 'wuhan-fas-img',
  ImageAk: 'iCduUao0AIuRdTqd3_4oqwzU8doDU3vh0sMF1CzD',
  ImageSk: 'UtrtzaV8CAXgRkajynOnghX24NrS70Qs0RJozPcZ',
}

export default Object.assign(Config, CustomConfig);
