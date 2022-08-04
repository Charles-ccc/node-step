### express-video 接口文档

#### 接口说明

---

- 基于 Restful API 接口规范
- 基于 JWT 身份认证
- 使用 CORS 跨域
- 接口基础请求地址 http://127.0.0.1:3000/api/v1
- 使用 JSON 格式进行数据通信

#### 用户注册

---

path: /user/registers
methods: POST
是否认证: 否

| 字段名 ｜ 类型 ｜ 是否必须 |
| ----- ｜ --- ｜ ---- ｜
| username | string | true |
| email | string | true |
| phone | string | true |
| password | string | true |

请求示例:

```
{
    "username":"kekeke",
    "email":"abcd@qq.com",
    "phone":1881727272,
    "password":"123123123"
}
```

响应示例:

```javascript
// success
{
    "username": "kekeke",
    "email": "22da2@qq.com",
    "phone": "1881727272",
    "avatar": null,
    "createAt": "2022-08-03T08:41:01.792Z",
    "updateAt": "2022-08-03T08:41:01.792Z",
    "_id": "62ea349fede8c08607a8ba11",
    "__v": 0
}
```

```javascript
// error
{
  "error": [
    {
        "value": "22da2@qq.com",
        "msg": "邮箱已被注册",
        "param": "email",
        "location": "body"
    }
  ]
}
```
