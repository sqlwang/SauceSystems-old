<?php

class SiteController extends Controller
{
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}

	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex()
	{
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
		$this->render('index');
	}
	
	public function actionIndex1()
	{
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
		$this->render('index1');
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				$this->render('error', $error);
		}
	}

	/**
	 * Displays the contact page
	 */
	public function actionContact()
	{
		$model=new ContactForm;
		if(isset($_POST['ContactForm']))
		{
			$model->attributes=$_POST['ContactForm'];
			if($model->validate())
			{
				$name='=?UTF-8?B?'.base64_encode($model->name).'?=';
				$subject='=?UTF-8?B?'.base64_encode($model->subject).'?=';
				$headers="From: $name <{$model->email}>\r\n".
					"Reply-To: {$model->email}\r\n".
					"MIME-Version: 1.0\r\n".
					"Content-type: text/plain; charset=UTF-8";

				mail(Yii::app()->params['adminEmail'],$subject,$model->body,$headers);
				Yii::app()->user->setFlash('contact','Thank you for contacting us. We will respond to you as soon as possible.');
				$this->refresh();
			}
		}
		$this->render('contact',array('model'=>$model));
	}


	/**
	 * Logs out the current user and redirect to homepage.
	 */
	public function actionLogout()
	{
		Yii::app()->user->logout();
		$res = new Response();
		$res->success = true;
        $res->message = '退出成功';
        $res->data = '';
		echo $res->to_json();
	}
	
	/**
	 * Displays the login page
	 */
	public function actionLogin()
	{
		$model=new LoginForm;
		// if it is ajax validation request
		if(isset($_POST['ajax']) && $_POST['ajax']==='login-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}

		// collect user input data
		if(isset($_POST['LoginForm']))
		{
			$model->attributes=$_POST['LoginForm'];
			// validate user input and redirect to the previous page if valid
			if($model->validate() && $model->login()){
				//获取用户的权限信息
				$data = $this->getPrivileges($model->userID);
				$result = array('success' => true, 'messasge'=> '登录成功', 'privileges' => $data);
			}else{
				$result = array('success' => false, 'messasge'=> '用户名或密码错误');
			}
			
		}else{
			$result = array('success' => false, 'messasge'=> '用户名不存在');
		}
		echo json_encode($result);
	}
	
	
	/**
	 * get privileges of user
	 */
	public function getPrivileges($userID){
		$items =  Yii::app()->db->createCommand()
	    ->select('c.name as PrivilegeName')
	    ->from('authitem a')
	    ->join('authitemchild b', 'a.name = b.parent')
		->join('authitem c', 'c.name = b.child')
		->join('authassignment d', 'd.itemname = a.name')
	    ->where('d.userid= cast('."$userID" .' as varchar)')
	    ->queryAll();
		$data = array();
		foreach($items as $key =>$value){
			array_push($data, $value['PrivilegeName']);
		}
		return $data;
	}
	
	/**
	 * 判断用户是否登录
	 */
	public function actionIsLogged()
	{
		$res = new Response();
		//echo Yii::app()->session->userName;
		if(!Yii::app()->user->isGuest){
			$res->success = true;
       	 	$res->message = '';
       		$res->data = array(
				'id' => Yii::app()->user->id,
				'name' => Yii::app()->user->userName
			);
		}else{
			$res->success = false;
       	 	$res->message = '';
       		$res->data = array();
		}
		echo $res->to_json();
	
	}
	
}