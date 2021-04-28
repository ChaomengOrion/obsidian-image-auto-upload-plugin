[中文文档](readme-zh.md)

# Obsidian Image Auto Upload Plugin

This plugin can help you to auto upload image by [picgo](https://github.com/Molunerfinn/PicGo).

# Start

1. install the [picgo](https://github.com/Molunerfinn/PicGo) and config it
2. open the tool and open the setting "设置 server"
3. install the plugin in obsidian
4. open the plugin setting, and set the "picGo server" http://127.0.0.1:{{port in picgo}}/upload（example：http://127.0.0.1:36677/upload）
5. try paste image

# Features

## Upload when paste image

When you paste image to obsidian, this plugin will auto upload you image.

You can set `image-auto-upload: false` in `frontmatter` to control one file.

support ".png", ".jpg", ".jpeg", ".bmp", ".gif", ".svg", ".tiff"

```yaml
---
image-auto-upload: true
---

```

## Upload all local images file by command

press `ctrl+P` and input `upload all images`，enter, then will auto upload all local images

！！info
Because of the weak upload api,this feature may have bugs.

# TODO

- [x] upload all local images file by command
- [x] support yaml to config if upload image
- [ ] support picgo-core
- [x] support upload image from system copy selected image

# Thanks

[obsidian-imgur-plugin](https://github.com/gavvvr/obsidian-imgur-plugin)
