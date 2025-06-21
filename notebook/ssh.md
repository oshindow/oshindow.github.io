# 远程服务器无密码登录
1. 生成 SSH 密钥对
首先需要在本地机器上生成 SSH 密钥对id_rsa 和id_rsa.pub 。
```sh
ssh-keygen -t rsa -b 4096 -C "xintong.wang@u.nus.edu"
```

2. 将公钥复制到远程服务器
将生成的公钥复制到远程服务器的 ~/.ssh/authorized_keys 文件中。可以使用 ssh-copy-id 命令来完成这一步。

```sh
ssh-copy-id xintong@smc-gpu3.d2.comp.nus.edu.sg
```

3. 在vscode 中配置 id_rsa 登录
```
Host smc-gpu4.d2.comp.nus.edu.sg
    HostName smc-gpu4.d2.comp.nus.edu.sg
    IdentityFile C:\ssh\id_rsa
    User xintong
```
