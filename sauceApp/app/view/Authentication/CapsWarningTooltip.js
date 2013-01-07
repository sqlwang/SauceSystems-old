/**
 *
 * Modelo de Login usando MCV
 * Desenvolvido por Ricardo Hirashiki
 * Publicado em: http://www.sitedoricardo.com.br
 * Data: Ago/2011
 *
 * Baseado na extensao criada por Wemerson Januario
 * http://code.google.com/p/login-window/
 *
 */
 
Ext.define('SauceApp.view.Authentication.CapsWarningTooltip', {
  extend       : 'Ext.tip.QuickTip',
  alias        : 'widget.capswarningtooltip',
  target       : 'authentication-login',
  id           : 'toolcaps',
  anchor       : 'left',
  anchorOffset : 60,
  width        : 305,
  dismissDelay : 0,
  autoHide     : false,
  disabled     : false,
  title        : '<b>Caps Lock est&aacute; ativada</b>',
  html         : '<div>Se Caps lock estiver ativado, isso pode fazer com que voc&ecirc;</div>' +
                 '<div>digite a senha incorretamente.</div><br/>' +
                 '<div>Voc&ecirc; deve pressionar a tecla Caps lock para desativ&aacute;-la</div>' +
                 '<div>antes de digitar a senha.</div>' 
});