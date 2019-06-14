import JsonP from 'jsonp';
import axios from 'axios';
import {Modal} from 'antd'
export default class Axios{
    static jsonp(options){
        if(!options.url){
            console.error('Axios.JSONP 至少需要一个url参数！');
            return;
        }
     return  new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function(err,response){
                //todo
                if(response.status=='success'){
                    resolve(response);
                }else{
                    reject(response.message);
                }
            })
        })
    }
    static ajax(options){
        let loading;
        if(options.data&&options.data.isShowLoading!==false){
            loading=document.getElementById('ajaxLoading');
            loading.style.display='block';
        }
        return new Promise((resolve,reject)=>{
            let baseApi = 'https://easy-mock.com/mock/5cf86f5ab2ab287d7f9cd0cb/mockapi';
            axios({
                url:options.url,
                methods:'get',
                baseURL:baseApi,
                timeout:5000,
                params:(options.data.params&&options.data)||'',

            }).then((response)=>{
                if(options.data&&options.data.isShowLoading!==false){
                    loading=document.getElementById('ajaxLoading');
                    loading.style.display='none';
                }
                if(response.status=='200'){
                    let res=response.data;
                    if(res.code=='0'){
                        resolve(res)
                    }else{
                        Modal.info({
                            title:'提示',
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data)
                }
            })
        })
    }
}