# the api of system

## service

    method                      url                                           describe                      attribute(req)
     get                api/ufwd/service/account                        获取所有注册的账户信息                 query:{
                                                                                                                 examine:true或false(boolean)
                                                                                                             }
     get                api/ufwd/service/account/:aid                   获取某一指定的账户信息                 params:{
                                                                                                                 aid:用户名(string)
                                                                                                             }
     put                api/ufwd/service/account/:aid                   修改指定账户审核状态                   body:{
                                                                                                                examine:true(boolean)
                                                                                                             }
                                                                                                             params:{
                                                                                                                 aid:用户id(int)
                                                                                                             }
     delete             api/ufwd/service/account/:aid                   删除指定账户的账户信息                 params:{
                                                                                                                 aid:用户id(int)
                                                                                                             }
     patch              api/ufwd/service/account/:aid/password          修改指定账户的密码                     body:{
                                                                                                                 password:新密码(string)
                                                                                                             }
                                                                                                             params:{
                                                                                                                 aid:用户id(string)
                                                                                                             }
     post               api/ufwd/service/administrator                  创建一个管理员                        body:{
                                                                                                                 account:用户id(string) 
                                                                                                             }
     get                api/ufwd/service/administrator                  获取所有的的管理员的信息               无参数

     get                api/ufwd/service/administrator/:admini          获取某个管理员的信息                   params:{
                                                                                                                 admini:用户id(int)
                                                                                                             }
     delete             api/ufwd/service/administrator/:admini          删除某个管理员                         params:{
                                                                                                                 admini:用户id(int)
                                                                                                             }
     post               api/ufwd/service/writer                         创建一个作家                          body:{
                                                                                                                 account:用户id(int) 
                                                                                                                 channel:频道id
                                                                                                             } 
     get                api/ufwd/service/writer                         获取所有的作家的信息                   无参数

     get                api/ufwd/service/writer/:wid                    获取某个作家的信息                     params:{
                                                                                                                 wid:用户名(int)，
                                                                                                                 channel:频道id(int)
                                                                                                             }
     put                api/ufwd/service/writer/:wid                    修改某个作家的信息                     body:{
                                                                                                                 channel:频道id(int)
                                                                                                             }
                                                                                                             params:{
                                                                                                                 wid:用户名(int)
                                                                                                             }
     delete             api/ufwd/service/writer/:wid                    删除某个作家                          params:{
                                                                                                                 wid:用户名(int)
                                                                                                             }
     post               api/ufwd/service/channel                        创建一个频道                          body:{
                                                                                                                 name:频道名(string),
                                                                                                                 description:频道描述(string)
                                                                                                             }
     get                api/ufwd/service/channel                        获取所有的频道的信息                   无参数

     get                api/ufwd/service/channel/:cid                   获取某个频道的信息                     params:{
                                                                                                                 cid:频道name(string)
                                                                                                             }
     put                api/ufwd/service/channel/:cid                   修改某个频道的信息                     body:{
                                                                                                                 name:频道名称(string)
                                                                                                                 description:频道描述(string)
                                                                                                             }
                                                                                                             params:{
                                                                                                                 cid:频道id(int)
                                                                                                             }
     delete             api/ufwd/service/channel/:cid                   删除某个频道                          params:{
                                                                                                                 cid:频道id(int)
                                                                                                             }
     post               api/ufwd/service/group                          创建一个类                            body:{
                                                                                                                 name:类名(string),
                                                                                                                 description:类描述(string)
                                                                                                             }
     get                api/ufwd/service/group                          获取所有的类的信息                     无参数

     get                api/ufwd/service/group/:gid                     获取某个类的信息                      params:{
                                                                                                                 gid:类id(int)
                                                                                                             }
     put                api/ufwd/service/group/:gid                     修改某个类的信息                      body:{
                                                                                                                 name:类名称(string)
                                                                                                                 description:类描述(string)
                                                                                                             }
                                                                                                             params:{
                                                                                                                 cid:类id(int)
                                                                                                             }
     delete             api/ufwd/service/group/:gid                     删除某个类                            params:{
                                                                                                                 gid:类id(int)
                                                                                                             }
     post               api/ufwd/service/group/:gid/account/:aid        将某个用户归于某类                     body:{}
                                                                                                             params:{
                                                                                                                 gid:类id(int),
                                                                                                                 aid:账户id(int)
                                                                                                             }
     get                api/ufwd/service/group/:gid/account             获取某个类的所有的用户信息              params:{
                                                                                                                 gid:类id(int)
                                                                                                             }
     get                api/ufwd/service/group/:gid/account/:aid        获取某个类的某个用户的信息              params:{
                                                                                                                 gid:类id(int),
                                                                                                                 aid:账户id(int)
                                                                                                             }
     delete             api/ufwd/service/group/:gid/account/:aid        删除某个类的某个用户                   params:{
                                                                                                                 gid:类id(int),
                                                                                                                 aid:账户id(int)
                                                                                                             }
     get                api/ufwd/service/account/:aid/group             获取某个用户的所属的所有类信息          params:{
                                                                                                                 aid:账户id(int)
                                                                                                             }
     get                api/ufwd/service/account/:aid/group/:gid        获取某个用户的某个类的信息              params:{
                                                                                                                 gid:类id(int),
                                                                                                                 aid:账户id(int)
                                                                                                             }
     delete             api/ufwd/service/account/:aid/group/:gid        删除某个用户对某个类的所属关系          params:{
                                                                                                                 gid:类id(int),
                                                                                                                 aid:账户id(int)
                                                                                                             }
     get                api/ufwd/service/advise                         获取所有的投诉                        query:{
                                                                                                                 examine:true或false(boolean)
                                                                                                             }
     get                api/ufwd/service/advise/:advise/account/:aid    获取某条投诉                          params:{
                                                                                                                 advise:advise的id(int),
                                                                                                                 aid:账户id(int)
                                                                                                             }
     delete             api/ufwd/service/advise/:advise/account/:aid    删除某条投诉                          params:{
                                                                                                                 advise:advise的id(int),
                                                                                                                 aid:账户id(int)
                                                                                                             }
     post               api/ufwd/service/notification                   生成通知                              body:{
                                                                                                                recevier:账户id(int)
                                                                                                                content:通知内容(string)
                                                                                                             }
     get                api/ufwd/service/notification                   获取所有的通知                         无参数

     get                api/ufwd/service/notification/:nid              获取某条通知的详细信息                 params:{
                                                                                                                nid:通知的id(int)
                                                                                                             }
     post               api/ufwd/service/session/account                登陆                                  body:{
                                                                                                                name:账户名(string)，
                                                                                                                password:密码(string)
                                                                                                             }
     delete             api/ufwd/service/session/account                注销                                  无参数



## app

    method                      url                                           describe                           attribute
     post               api/ufwd/app/sessiom/account                          登陆                             body:{
                                                                                                                name:账户名(string)，
                                                                                                                password:密码(string)
                                                                                                             }
     delete             api/ufwd/app/session/account                          注销                            无参数

     post               api/ufwd/app/account                                  注册账户                         body:{
                                                                                                                name:账户名(string)，
                                                                                                                password:密码(string),
                                                                                                                ufwd:{
                                                                                                                    name:姓名(string),
                                                                                                                    sex:性别("male"||"female")(string),
                                                                                                                    phone:电话号码(string)
                                                                                                                }
                                                                                                             }
     get                api/ufwd/app/account                                  获得个人相关的账户信息           无参数

     put                api/ufwd/app/account                                  修改个人信息                    body:{
                                                                                                                name:新账户名(string)，
                                                                                                                ufwd:{
                                                                                                                    name:新姓名(string),
                                                                                                                    sex:性别("male"||"female")(string),
                                                                                                                    phone:新电话号码(string)
                                                                                                                }
                                                                                                             }
     patch              api/ufwd/app/account/password                                  修改密码                        body:{
                                                                                                                 password:新密码(int)
                                                                                                             }

     post               api/ufwd/app/channel/:cid                             用户关注某个频道                 body:{
                                                                                                                cid:频道的id(int)
                                                                                                             }
     get                api/ufwd/app/channel                                  获得用户关注的所有频道的信息      无参数

     get                api/ufwd/app/channel/:cid                             获得用户关注的某个频道的信息      params:{
                                                                                                                cid:频道的id(int)
                                                                                                             }

     delete             api/ufwd/app/channel/:cid                             用户取消对某个频道的关注          params:{
                                                                                                                cid:频道的id(int)
                                                                                                             }
     post               api/ufwd/app/advise                                   用户提交投诉                    body:{
                                                                                                                content:投诉的内容(string)
                                                                                                             }
     get                api/ufwd/app/advise                                   用户查看自己的所有投诉           无参数


     get                api/ufwd/app/advise/:advise                           用户查看自己的某条投诉           params:{
                                                                                                                advise:advise的id(int)
                                                                                                             }
     get                api/ufwd/app/notification                             用户查看发给自己的所有通知        无参数


     get                api/ufwd/app/notification/:nid                        用户查看某条通知具体内容          params:{
                                                                                                                nid:通知的id(int)
                                                                                                             }
     delete             api/ufwd/app/notification/:nid                        用户已阅某条通知                 params:{
                                                                                                                nid:通知的id(int)
                                                                                                             }
     get                api/ufwd/app/group                                    用户获取自己的所有分类信息        无参数

     
     get                api/ufwd/app/group/:gid                               用户获取自己的某项分类的具体信息   params:{
                                                                                                                gid:类的id(int)
                                                                                                             }