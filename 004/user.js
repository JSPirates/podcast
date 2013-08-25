/*
    Найти существующего, или создать запись пользователя
    по данным из PassportJS.
 */
function findOrCreateUser(db, profile, callback) {

}
/*
    Вернуть учетную запись пользователя
 */
function getUser(db, id, callback) {

}

/*
    Сохранить запись о пользователе в БД
 */
function storeUser(db, user, callback) {

}

module.exports = function (db) {


    api = {
        findOrCreateUser: findOrCreateUser.bind(null, db)
    }

};