<?php

class UserController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';

	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
			'accessControl', // perform access control for CRUD operations
			//'postOnly + delete', // we only allow deletion via POST request
		);
	}

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules()
	{
		return array(
			array('allow',  // allow all users to perform 'index' and 'view' actions
				'actions'=>array('index','view', 'List','delete','create','update'),
				'users'=>array('*'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin'),
				'users'=>array('admin'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}

	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{
		$this->render('view',array(
			'model'=>$this->loadModel($id),
		));
	}

	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
		$model=new User;
		$res = new Response();
		$request = new Request(array('restful' => false));
		if (is_object($request->params)) {
			$params = get_object_vars($request->params) ;
		} else {
			$params = $request->params;
		}
	   
		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);
		$model->attributes=  array(
			'email' => $params['email'],
			'password' => $params['password'],
			'user_name' => $params['userName'],
			'create_time' => date("Y-m-d H:i:s",time()) 
		);
		$userID = User::model()->find('user_name = :user_name',array(':user_name'=> $params['userName'])) ;
		if(empty($userID)){
			if($model->save()){
				$data = array('userID' => $model->user_id);
				//添加角色
				$assignmentModel = new Assignment;
				$assignmentModel->attributes = array(
					'itemname' =>  $params['roleName'],
					'userid' => "$model->user_id"
				);
				if($assignmentModel->save()){
					$success = true;
					$message = '添加用户成功';
				}else{
					$success = false;
					$message = '添加用户权限失败';
				}
				
			}else{
				$success = false;
				$message = '添加用户失败';
				$data = array();
			}
		}else{
			$success = false;
			$message = '添加用户失败,用户已经存在';
			$data = array();
		}
		

		$res->success = $success;
        $res->message = $message;
        $res->data = $data;
		echo $res->to_json();
	}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate()
	{
		
		$request = new Request(array('restful' => false));
		if (is_object($request->params)) {
			$params = get_object_vars($request->params) ;
		} else {
			$params = $request->params;
		}
		
		$res = new Response();
		$model=$this->loadModel($params['userID']);
		if (!$model) {
			$success = fasle;
			$message = '修改用户不存在';
		}else{
			// Uncomment the following line if AJAX validation is needed
			// $this->performAjaxValidation($model);
			$attributesAarry = array();
			foreach ($params as $key => $value) {
				if($key == 'email'){
					$array =  array(
						'email' => $value
					);
				}
				
				if($key == 'password'){
					$array =  array(
						'password' => $value
					);
				}
				
				if($key == 'userID'){
					$array =  array(
						'user_id' => $value
					);
				}
				$model->attributes = $array;
			}
			$model->attributes =  $attributesAarry;
			if($model->save()){
				$success = true;
				$message = '修改用户成功';
			}else{
				$success = false;
				$message = '修改用户失败';
			}
		}

		$res->success = $success;
        $res->message = $message;
        $res->data = array();
		echo $res->to_json();
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete()
	{
		$request = new Request(array('restful' => false));
		if (is_object($request->params)) {
			$params = get_object_vars($request->params) ;
		} else {
			$params = $request->params;
		}
		$res = new Response();
		$model = $this->loadModel($params['userID']);
		if($model){
			$success = $model->delete();
			if($success){
				$message = '删除用户成功';
			}else{
				$message = '删除用户失败';
			}
		}else{
			$success = false;
			$message = '删除用户不存在';
		}
		
		$data = array();
		
		$res->success = $success;
        $res->message = $message;
        $res->data = $data;
		echo $res->to_json();
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$dataProvider=new CActiveDataProvider('User');
		
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
	}
	
	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new User('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['User']))
			$model->attributes=$_GET['User'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer the ID of the model to be loaded
	 */
	public function loadModel($id)
	{
		$model=User::model()->findByPk($id);
		if($model===null)
			return false;
		
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param CModel the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='user-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
	
	
	/**
	 * Lists all models.
	 */
	public function actionList()
	{
		
		$items =  Yii::app()->db->createCommand()
	    ->select('a.*, c.name as roleName, c.description as roleDescription')
	    ->from('user a')
	    ->join('authassignment b', 'a.user_id = cast( b.userid as int)')
		->join('authitem c', 'c.name = b.itemname')
		->limit( empty($_REQUEST['limit']) ? 10 : $_REQUEST['limit'])
		->offset( empty($_REQUEST['start']) ? 0 : $_REQUEST['start'])
	    ->queryAll();
		$data = array();
		
		foreach($items as $key =>$value){
			$array = array(
				'userID' => $value['user_id'],
				'userName' => $value['user_name'],
				'email' => $value['email'],
				'roleName' => $value['roleName'],
				'roleDescription' => $value['roleDescription'],
				'createTime' => date("Y-m-d H:i:s", strtotime($value['create_time'])),
				'lastTime' => $value['last_login_time']
			);
			array_push($data, $array);
		}
		
		$res = new Response();
        $res->success = true;
        $res->message = "Loaded data";
        $res->data = $data;
		$items =  Yii::app()->db->createCommand()
	    ->select('a.*, c.name as roleName, c.description as roleDescription')
	    ->from('user a')
	    ->join('authassignment b', 'a.user_id = cast( b.userid as int)')
		->join('authitem c', 'c.name = b.itemname');
		$res->totalCount = count($items);
        echo $res->to_json();
	}
}
