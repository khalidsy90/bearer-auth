/*
1-sign-up route
    1- register client informations in the DataBase
    2- username and password came from req.body
    3- crypt the username and password using bcrypt --> bcrypt.hash(req.body.password,5)
       -the stirng will be like this --> $2a$12$iAKzXVvgJj2gJZ4nhc0mr.AL3zyxThT7kBHnKJiLUvUtNC.zxp362
    4- save data user in the model-table
2-sign-in route
    1- in sign in we need middleware to verify 
       userName and password --> from Form sign-in ===  userName and password hashed in the model-table
    2- make middleware called basic 
    3- to imagin the data sended from Form we will use --> req.headers.authorization --> we can send it from PostMan
       - data will be like this "Basic dGFtaW06cGl6emE=" so we need to split it req.headers.authorization.split(" ")[1]
    4- the data from model is hashed we need to convert it to Normal String using --> base64.decode(hashedUserInfo)
       - data came like this --> khalid:hamedi so wee need to split it --> base64.decode(basicHeaderParts).split(':')
    5- search in model-table using user name
    6- now check the password is valid using --> bcrypt.compare(password from model, password from Form user);
    7- if valid --> next middleware --> now sign in || if not throw exception
*/