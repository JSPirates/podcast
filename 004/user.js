/*
    Получаем идентификатор пользователя в нашей БД для
    поиска. В реальности необходим свой собственный идентификатор.

    Поля provider и id — свойства структуры профиля, которую возвращает
    PasssportJS — http://passportjs.org/guide/profile/
 */
function prepareId(profile) {
    return [profile.provider, profile.id].join(':');
}

/*
    Найти существующего, или создать запись пользователя
    по данным из PassportJS.
 */
function findOrCreateUser(db, profile, callback) {
    var id = prepareId(profile);

    getUser(db, id, onFetchedUser);

    function onFetchedUser(error, user) {
        if (error) { return callback(error); }
        if (user) {
            // Нашли пользователя, можем возвращать
            return callback(null, user);
        } else {
            // Пользователь не найден, необходимо создать новую запись и вернуть ее
            return storeUser(db, profile, callback);
        }
    }
}
/*
    Вернуть учетную запись пользователя
 */
function getUser(db, id, callback) {
    console.log('load user with id', id);
    db.get(id, function (error, doc) {
        if (error) {
            if (error.name == 'NotFoundError') {
                callback();
            } else {
                callback(error);
            }
        } else {
            callback(null, doc);
        }
    });
}
/*
    Сохранить запись о пользователе в БД
 */
function storeUser(db, user, callback) {
    var id = prepareId(user);
    console.log('storeUser with id', id);
    db.put(id, user, function (error) {
        if (error) { callback(error); }
        else { callback(null, user); }
    });
}

/*
    Функция проверки пароля
 */
function checkPassword(user, password) {
    return password == user.password;
}

function serializeUser(user, callback) {
    callback(null, prepareId(user));
}

module.exports = function (db) {
    return {
        findOrCreateUser: findOrCreateUser.bind(null, db),
        serializeUser: serializeUser,
        deserializeUser: getUser.bind(null, db),
        getUser: getUser.bind(null, db),
        storeUser: storeUser.bind(null, db),
        checkPassword: checkPassword
    }
};