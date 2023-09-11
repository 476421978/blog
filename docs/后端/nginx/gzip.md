### 云服务器nginx.conf自带默认配置
```
gzip on;  #on 开启
gzip_vary on; #是否在http header中添加Vary: Accept-Encoding，建议开启
gzip_proxied any; #any 无条件启用压缩
gzip_comp_level 6; #压缩等级
gzip_buffers 16 8k; #设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。 例如 4 4k 代表以4k为单位，按照原始数据大小以4k为单位的4倍申请内存。 4 8k 代表以8k为单位，按照原始数据大小以8k为单位的4倍申请内存。如果没有设置，默认值是申请跟原始数据相同大小的内存空间去存储gzip压缩结果。
gzip_http_version 1.1; #版本
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript; #匹配MIME类型进行压缩，（无论是否指定）"text/html"类型总是会被压缩的。
```
### 开启后 Response Headers 会看到
```
Content-Encoding: gzip;
```
