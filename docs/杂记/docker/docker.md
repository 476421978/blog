### 安装教程
https://www.runoob.com/docker/docker-install-mysql.html

### 替换下载地址
```
{
  "debug": true,
  "registry-mirrors": [
    "https://hub-mirror.c.163.com"
  ],
  "experimental": false
}
```

### 拉取Ubuntu
```
docker pull ubuntu
```
默认最新版[可指定版本**ubuntu:15.10**: 这是指用 ubuntu 15.10 版本镜像为基础来启动容器]


### 根据镜像的 IMAGE ID 运行容器
```
docker run -it --name hlg-demo IMAGE ID /bin/sh
```
*   **\-i**: 交互式操作。
*   **\-t**: 终端。
*   **/bin/bash**：放在镜像名后的是命令，这里我们希望有个交互式 Shell，因此用的是 /bin/bash。
**桌面端真香**


### 和平常使用的Ubuntu服务器区别
虚拟机里装的ubuntu是ubuntu的内核 + ubuntu的文件系统
docker里的ubuntu是任意的内核（你底层的操作系统的内核）+ ubuntu的文件系统


### nginx，mysql，redis的安装，同时运行 独立容器
#### 拉取到本地
<img src="/杂记/docker/1.png" />

#### nginx-test容器
~~~
docker run --name nginx-test -p 8080:80 -d nginx
~~~
#### mysql-test容器
~~~
docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
~~~
#### redis-test容器
~~~
docker run -itd --name redis-test -p 6379:6379 redis
~~~
⚠️注意：如果本地有安装软件映射的端口不要和本地冲突喔！！！




### 上传公共库 476421978[用户名]
```
docker login
```
```
docker tag ubantu:latest 476421978/hlg-demo:v2
```
```
docker push 476421978/hlg-demo:v2
```
若果tag添加标签时没有加上用户名476421978则在push中提示
```
requested access to the resource is denied
```


### 查询
```
docker search 476421978
```

### 下载
```
docker pull 476421978/hlg-demo:v2
```


## 前端项目 本地部署 docker nginx容器 调试步骤
挂载宿主机的nginx配置一直不成功，无奈只能进入容器修改配置了
```
[root@poloyy ~]# docker run -it -d -v ~/nginx.conf:/etc/nginx/nginx.conf nginx
e0e4b40446a64927603b85854c3a6472b2dfa5681fcbfa0e170c16b15e5c8fdd
docker: Error response from daemon: OCI runtime create failed: container_linux.go:380: starting container process caused: process_linux.go:545: container init caused: rootfs_linux.go:76: mounting "/root/nginx.conf" to rootfs at "/etc/nginx/nginx.conf" caused: mount through procfd: not a directory: unknown: Are you trying to mount a directory onto a file (or vice-versa)? Check if the specified host path exists and is the expected type.
[root@poloyy ~]# client_loop: send disconnect: Broken pipe

```
### docker 安装 nginx
```
docker pull nginx
```
### 运行nginx容器 命名nginx-test
~~~
docker run --name nginx-test -p 8080:80 -d nginx
~~~
* 宿主机本地运行localhost:8080验证是否成功


### docker进入nginx-test容器
~~~
docker exec -it nginx-test bash
~~~


### vim修改nginx配置文件
更新安装工具
```
apt-get update
```
安装vim
```
apt-get install vim
```
修改配置文件
```
vim /etc/nginx/conf.d/default.conf
```
* **注意nginx配置端口要和运行容器时的映射端口保持一致**
### 例如
```
server {
    listen    80;
    server_name    localhost;
    root    /usr/share/nginx/dist;
    location ^~/api/ {
           proxy_pass IP或者域名;
   }
    location / {
        try_files $uri $uri/ /index.html;
        index  index.html index.htm;
    }
}
```
* ^~/api/    对应前端想要代理去访问的接口地址拼接


### 前端打包项目上传到nginx-test容器中
```
docker cp /data/dist/ nginx-test:/usr/share/nginx/
```
* docker cp 不会覆盖文件
* /data/dist/  在宿主机的C盘根目录
* nginx-test:/usr/share/nginx/ 对应nginx-test容器的位置，也对应nginx配置的root路径
* 本地浏览器打开地址 localhost:8080 访问即可


###  常用命令
命令大全：https://www.runoob.com/docker/docker-command-manual.html






