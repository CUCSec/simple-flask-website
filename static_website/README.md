# 静态网站

每个页面单独一个 `html` 文件，相同的部分无法复用。

访问者也不能提交数据来修改网站内容。

运行请clone本仓库到本地后，打开命令行进入到此目录，用 Python 自带简单 Web 服务器即可。

```bash
cd static_website
python -m http.server
```