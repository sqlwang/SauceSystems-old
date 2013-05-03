<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'My Web Application',

	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
		'application.components.lib.*',
		'application.modules.srbac.controllers.SBaseController'
	),

	'modules'=>array(
		'gii'=>array(
			'class'=>'system.gii.GiiModule',
			'password'=>'123456',
			// If removed, Gii defaults to localhost only. Edit carefully to taste.
			'ipFilters'=>array('127.0.0.1','::1'),
		)
	),

	// application components
	'components'=>array(
		'user'=>array(
			// enable cookie-based authentication
			'allowAutoLogin'=>false,
		),
		
		// uncomment the following to enable URLs in path-format
		'urlManager'=>array(
			'urlFormat'=>'path',
			'rules'=>array(
				'<controller:\w+>/<id:\d+>'=>'<controller>/view',
				'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
				 'gii'=>'gii',
            	'gii/<controller:\w+>'=>'gii/<controller>',
            	'gii/<controller:\w+>/<action:\w+>'=>'gii/<controller>/<action>'
			 )
		),
		// uncomment the following to use a MySQL database
		// 'db'=>array(
			// 'connectionString' => 'mysql:host=localhost;dbname=m',
			// 'username' => 'root',
			// 'password' => 'root',
			// 'charset' => 'utf8',
		// ),
		'db'=> array(
			'class'=>'CDbConnection',
            'connectionString'=>'pgsql:host=127.0.0.1;port=5432;dbname=myapp',
            'username'=>'postgres',
            'password'=>'2881010'
		),
		
		//'username'=>'postgres',
       //     'password'=>'17jiangyou'
		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>'site/error',
		),
		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
				),
				// uncomment the following to show log messages on web pages
				/*
				array(
					'class'=>'CWebLogRoute',
				),
				*/
			),
		),
		'authManager'=>array(
            'class'=>'CDbAuthManager',
            'connectionID'=>'db',
            'itemTable' => 'authitem',//认证项表名称
			'itemChildTable' => 'authitemchild',//认证项父子关系
			'assignmentTable' => 'authassignment'//认证项赋权关系
        ),
        'session' => array (
			'class'=> 'system.web.CDbHttpSession',
			'autoStart' => true,
            'connectionID' => 'db',
            'sessionTableName' => 'session',
            'autoCreateSessionTable' => false,
            'cookieMode' => 'only',
		)
		
	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>array(
		// this is used in contact page
		'adminEmail'=>'webmaster@example.com',
	),
);