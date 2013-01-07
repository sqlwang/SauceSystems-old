Ext.define('SauceApp.model.Admin.UserModel', {
	extend : 'Ext.data.Model',
	fields : ['userID', 'userName'
		 , 'email','password',{
			name : "lastTime",
			type : 'date',
			dateFormat : "Y-m-d"
		}, {
			name : 'createTime',
		}
	],
	idProperty : 'userID',
	proxy : {
		type : 'ajax',
		api : {
			read : 'index.php/user/list',
			update : 'index.php/user/update',
			create : 'index.php/user/create',
			destroy : 'index.php/user/delete'
		},
		reader : {
			type : 'json',
			root : 'data',
			totalProperty : 'totalCount',
			successProperty : 'success',
			idProperty : 'userID'
		},
        writer: {
            type: 'json',
            writeAllFields: false,
            root: 'data'
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.OK,
                    buttons: Ext.Msg.OK
                });
            }
        },
        afterRequest:function(request,success){
	        try {
                /*      ATENTION ---------------------------------------------------------------------------------------------------------------*
                 *      ExtJS 4.0.2a has a bug in the sync method, It does not have a success and failure handler to the response.                              *
                 *      To check the status of the transaction and send a message to the user, we need to set the aftherResquest method of              *
                 *      the proxy to listen inside the response.                                                                                                                                                                *
                 *      Following the standart way of responses, if success : false, the resquest object does not retrieve the response data    *
                 *      Because of that, was the need to create another method in the server to send the data. The field that have the real             *
                 *  status of the transaction is :                                                                                                                                                                                      *
                 *  boolean "transactionStatus", (could be TRUE or FALSE).                                                                                                                                      *
                 *      ------------------------------------------------------------------------------------------------------------------------*/
                var responseMsg = this.reader.getResponseData(request.operation.response).message;
                if ( request.operation.response.status == 200) {
                	if(request.operation.action !== 'read'){
                		Ext.Msg.alert('操作员管理:', responseMsg?responseMsg:'SUCCESS');
                	}
                        
                        /*
                         * DO SOME COOL STUFF HERE
                         */
                }
                else{
                        Ext.Msg.alert('操作员管理', responseMsg?responseMsg:'FALSE');
                }
	        }
	        catch(err) {
	                Ext.Msg.alert('操作员管理', "UNEXPECTED ERROR"+ err);
	        } 
        }
	}
}); 