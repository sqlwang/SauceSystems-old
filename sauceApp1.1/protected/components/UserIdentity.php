<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity
{
	private $_id;
	/**
	 * Authenticates a user.
	 * The example implementation makes sure if the username and password
	 * are both 'demo'.
	 * In practical applications, this should be changed to authenticate
	 * against some persistent user identity storage (e.g. database).
	 * @return boolean whether authentication succeeds.
	 */
	public function authenticate()
	{
		$this->errorCode=self::ERROR_PASSWORD_INVALID;  
		$userInfo = User::model()->find('user_name=:em', array('em' => $this->username));
 
        if(!$userInfo)
        {
            $this->errorCode= CBaseUserIdentity::ERROR_UNKNOWN_IDENTITY;
        }
        elseif($userInfo['password']  !== $this->password)
        {
            $this->errorCode= CBaseUserIdentity::ERROR_PASSWORD_INVALID;
        }
        else
        {
        	$this->_id = $userInfo['user_id'];
			$this->username = $userInfo['user_name'];
			$this->setState('userName', $userInfo['user_name']);
			//$this->setState('userName',  $userInfo['user_name']);
            $this->errorCode= self::ERROR_NONE;
        }
		unset($user);
        return !$this->errorCode;
	}
	
	/**
	 * @return integer the ID of the user record
	 */
	public function getId()
	{
		return $this->_id;
	}
}