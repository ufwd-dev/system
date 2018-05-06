the api of system
=====================================

# service

## POST /api/ufwd/service/account
创建用户（不需要审核）
```
{
    name: string,
    password: string,
    ufwd: {
        name: string,
        sex: string,
        phone: string,
        identification: string,
        party: number,
        street: number
    }
}
```
## POST /api/ufwd/service/party
```
{
    name: string
}
```
获取所有党派

## POST /api/ufwd/service/street
```
{
    name: string
}
```
获取所有街道

## GET /api/ufwd/service/party

获取所有党派

## GET /api/ufwd/service/street

获取所有街道

## GET /api/ufwd/service/account?name=string&username=string&examine=boolean&phone=string&identification=string
获取所有注册的账户信息           

## GET /api/ufwd/service/account/:aid  
获取某一指定的账户信息     

## PUT /api/ufwd/service/account/:aid
修改指定账户信息          
```
{
    name: string,
    ufwd: {
        name: string,
        sex: string,
        phone: string,
        identification: string,
        examine: boolean,
        party: number,
        street: number
    }
}
```

## DELETE /api/ufwd/service/account/:aid
删除指定账户的账户信息          

## PATCH /api/ufwd/service/account/:aid/password
修改指定账户的密码           
```
{
    password:新密码(string)
}
```

## POST /api/ufwd/service/administrator
创建一个管理员     
```
{
    account:用户名(string) 
}
```

## GET /api/ufwd/service/administrator
获取所有的管理员的信息     


## GET /api/ufwd/service/administrator/:admini
获取某个管理员的信息     

## DELETE /api/ufwd/service/administrator/:admini
删除某个管理员     

## POST /api/ufwd/service/group
创建一个类     
```
{
    name:类名(string),
    description:类描述(string)
}
```

## GET /api/ufwd/service/group?name=string
获取所有的类的信息     

## GET /api/ufwd/service/group/:gid 
获取某个类的信息     

## PUT /api/ufwd/service/group/:gid
修改某个类的信息     
```
{
    name:类名称(string)
    description:类描述(string)
}
```

## DELETE /api/ufwd/service/group/:gid
删除某个类     

## POST /api/ufwd/service/group/:gid/account/:aid
将某个用户归于某类     
```
{}
```

## GET /api/ufwd/service/group/:gid/account
获取某个类的所有的用户信息     

## GET /api/ufwd/service/group/:gid/account/:aid
获取某个类的某个用户的信息     

## DELETE /api/ufwd/service/group/:gid/account/:aid
删除某个类的某个用户     

### GET /api/ufwd/service/account/:aid/group
获取某个用户的所属的所有类信息     

## GET /api/ufwd/service/account/:aid/group/:gid
获取某个用户的某个类的信息     

## DELETE /api/ufwd/service/account/:aid/group/:gid
删除某个用户对某个类的所属关系     

## GET /api/ufwd/service/advise
获取所有的投诉     

## GET /api/ufwd/service/advise/:advise
获取某条投诉     

## DELETE /api/ufwd/service/advise/:advise
删除某条投诉     

## POST /api/ufwd/service/notification
生成通知     
```
{
    recevier:账户id(int)
    content:通知内容(string)
}
```

## GET /api/ufwd/service/notification?recevier=int
获取所有的通知     

## GET /api/ufwd/service/notification/:nid
获取某条通知的详细信息     

## POST /api/session/account
登陆     
```
{
    name:账户名(string)，
    password:密码(string)
}
```

## DELETE /api/session/account
注销     

# app

## POST /api/ufwd/app/session/account
登陆     
```
{
    name:账户名(string)，
    password:密码(string)
}
```

## DELETE /api/ufwd/app/session/account
注销     

## POST /api/ufwd/app/account
注册账户     
```
{
    name:账户名(string)，
    password:密码(string),
    ufwd:{
        name:姓名(string),
        sex:性别("male"||"female")(string),
        phone:电话号码(string),
        identification: string,
        party: number,
        street: number
    }
}
```

## GET /api/ufwd/app/account
获得个人相关的账户信息     

## PUT /api/ufwd/app/account/:accountId
修改个人信息     
```
{
    name:新账户名(string)，
    ufwd:{
        name:新姓名(string),
        sex:性别("male"||"female")(string),
        phone:新电话号码(string),
        identification: string,
        party: number,
        street: number
    }
}
```

## PATCH /api/ufwd/app/account/password
修改密码     
```
{
    password:新密码(string)
}
```

## POST /api/ufwd/app/advise
用户提交投诉     
```
{
    content:投诉的内容(string)
}
```

## GET /api/ufwd/app/advise
用户查看自己的所有投诉     

## GET /api/ufwd/app/advise/:advise
用户查看自己的某条投诉     

## GET /api/ufwd/app/notification
用户查看发给自己的所有通知     

## GET /api/ufwd/app/notification/:nid
用户查看某条通知具体内容     

## DELETE /api/ufwd/app/notification/:nid
用户已阅某条通知     

## GET /api/ufwd/app/group
用户获取自己的所有分类信息     

## GET /api/ufwd/app/group/:gid 
用户获取自己的某项分类的具体信息     