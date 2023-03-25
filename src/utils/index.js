export * from './constants';

export const setItemInLocalStorage = (key,value)=>{
    if(!key || !value){
        return console.error('cannot store in local storage');
    }
    const valueStore = typeof value != 'string' ? JSON.stringify(value) : value;

    localStorage.setItem(key,valueStore);
}
export const getItemFromLocalStorage=(key)=>{
    if(!key){
        return console.error('cannot get the value from local storage');
    }
    return localStorage.getItem(key);
}
export const removeItemFromLocalStorage=(key)=>{
    if(!key){
        return console.error('cannot get the value from local storage');
    }
    localStorage.removeItem(key);
}
export const getFormBody=(params)=>{

    let formBody=[];

    for(let property in params){
        let encodeKey=encodeURIComponent(property); //'user name' =>'user%20name'
        let encodedValue=encodeURIComponent(params[property]); //aakash 123 =>aakash%2020123
        formBody.push(encodeKey + '=' + encodedValue);
    }

    return formBody.join('&'); // 'username=aakash&passsword=123213'

}
