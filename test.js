const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('dodo','root','123456',{
    // host:''
    dialect:'mysql',

});

//创建user模型
class User extends Model {}
//初始化user
User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

async function run(){
    User.destroy({
        where: {
            id: 2
        }
    });
    const users = await User.findAll();
    console.log(JSON.stringify(users));
    await sequelize.close();
}

run();

//同步到数据库
(async () => {
    await sequelize.sync();
    //创建一条记录
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    //打印结果
    console.log(jane.toJSON());
})()



