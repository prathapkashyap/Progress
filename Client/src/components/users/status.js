var status={ 
    login_status:false,
    setStatus(cb){
        this.login_status=!this.login_status;
        console.log('the set status function in another file',this.login_status);

        setTimeout(cb)
    }
};
module.exports=status