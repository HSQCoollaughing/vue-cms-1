#这是一个Vue项目

###主要是学习Vue过程的见证

##制作首页App组件
1. 完成Header区域,使用的是Mint-UI的header组件
2. 制作底部的Tabbar区域使用的是MUI的Tabbar
    + 在制作购物车的小图标时
    + 需要将扩展图标的css样式拷贝到项目中
    + 需要将扩展图标的字体库ttf文件拷贝到项目中
3. 要在中间部分放置一个router-view 来展示路由匹配到的组件
 
## 改造tabbar为router-link
## 设置路由高亮
## 点击tabbar中的路由链接，展示对应的组件

## 制作首页轮播图布局
## 加载轮播图数据  
1. 获取数据使用v-resource组件
2. 使用v-resource的this.$http.get()方法获取数据
3. 获取到的数据要保存到data上
4. 使用v-for渲染每一个item


##改造九宫格导航
1. 使用MUI的grid-default进行改造

##组件切换增加动画
1. ?为什么增加position:absoulte即可实现
