/**
 * FeedBackZator Script
 * Provides useful funcions to generate modals and messages.
 * By Arthur Annibal - WebAniversario
 * Version 0.0.0
 */

if (typeof wNiver == "undefined") {throw "WebAniversario 'wNiver' Object was not found"}

wNiver.feedBackZator = {
	config : {
		messageContainerObj: wNiver.structure.messageContainer,
		modalContainerObj: wNiver.structure.modalContainer,
		defaultMessageType : "info",
		defaultMessageTime : 10000,
		defaultMessageScrollBehavior : false
	},
	
	messageHistory:[],
	
	newMessageHistoryObj : function(messageText, messageType, messageId, messageViewed) {
		if (typeof messageType == "undefined") messageType = this.config.defaultMessageType;
		if (typeof messageViewed == "undefined") messageViewed = false;
		
		this.messageHistory.push(
			{
				messageText:messageText,
				messageType:messageType,
				active:true,
				viewed:messageViewed
			}
		)
	},
	
	/**
	 * Display Message
	 * creates an bootstrap alert with the desired text and appends it to this object's default container object.
	 * @param String messageText - the html content inside the message
	 * @param String messageType [optional] - the class inserted in the alert. Default set by config.
	 * @param Integer messageTime [optional] - the time in millisseconds to auto close the alert. Default set by config. 0 or less won't close message automatically.
	 * @param Boolean messageScrollBehavior [optional] - Default true, and if true, will scroll the page into the message's top.
	 */
	displayMessage : function(messageText, messageType, messageTime, messageScrollBehavior) {
		if (typeof messageType == "undefined") messageType =this.config.defaultMessageType;
		if (typeof messageTime == "undefined") messageTime = this.config.defaultMessageTime;
		if (typeof messageScrollBehavior == "undefined") messageScrollBehavior = this.config.defaultMessageScrollBehavior;
		
		// create message
		var messageId = "message_id_"+ new Date().getTime();
		var messageObj = $("<div class='alert fade in alert-" + messageType + "' data-message-type='" + messageType + "' id='" + messageId + "'> <a href='#' class='close message-close' data-data-dismiss='alert' aria-label='close'>&times;</a><span class='message-text'>" + messageText + "</span></div>")
		messageObj.appendTo(this.config.messageContainerObj)
		
		// append message to messages when closed
		$("#"+messageId+" a.message-close").on("click",function(e) {
			wNiver.feedBackZator.newMessageHistoryObj( $(this).parent().find(".message-text").text(),
														$(this).parent().attr("data-message-type"),
														$(this).parent().attr("id"),
														true);
			setTimeout(function(messageId) {$("#"+messageId).remove();},300,messageId);
			$("#"+messageId).animate({opacity:0},300);
			e.preventDefault();
			
		});
		
		// close message by time
		if (messageTime > 0) { setTimeout(function(messageId) { $("#"+messageId+" a.message-close").click(); }, messageTime, messageId ); }
		
		// scroll to message
		if (messageScrollBehavior) {
			$('html, body').animate({
				scrollTop: $("#"+messageId).offset().top
			}, 400);
		}
	},
	
	clearMessages:function() { this.config.messageContainerObj.html(""); },
	
	dismissModal:function(evt) {
		var modalId = $(evt.target).parent().parent().parent().parent().attr("id");
		$("#"+modalId).remove();
	},
	
	/**
	 * Display Modal
	 * creates and shows a modal. custom buttons and close functions. appended to object container set in feedBackZator's config.
	 * @param String modalTitle - the h4 title text to be the text
	 * @param String modalContent - html content inside the modal
	 * @param Object closeButton: {
	 *    btnFunction : function to be called upon closing. Modal destroys itself already.
	 *    btnText : button text. Defaults to "Fechar".
	 *    btnType : the bootstrap's class to define the button type. gets a "btn-" prepended to it. Defaults to "default"
	 *    keepModalOpen : true means button does not closes modal. Close button ignores this flag.
	 * }
	 * @param Array modalButtons - an array of button configs to be placed together with close btn. Same syntax as closeButton.
	 * All buttons will have FIRST the modal close function assigned to it. Unless "keepModalOpen" flag is true.
	 */
	displayModal : function(modalTitle, modalContent, closeButton, modalButtons) {
		
		
		
		if (typeof closeButton == "undefined") closeButton = {};
		//if (typeof closeButton.btnFunction == "undefined") closeButton.btnFunction = ""
		if (typeof closeButton.btnText == "undefined" || closeButton.btnText.length == 0) closeButton.btnText = "Fechar";
		if (typeof closeButton.btnType == "undefined" || closeButton.btnType.length == 0) closeButton.btnType = "default";
		
		var modalId = "modal_id_"+ new Date().getTime();
		
		var modalContainerObj = $("<div class='modal fade in' role='dialog' style='display:block;' id='" + modalId + "'></div>");
			var modalDialogObj = $("<div class='modal-dialog'></div>").appendTo(modalContainerObj);
			modalDialogObj.on("click", preventEventPropagation);
				var modalContentObj = $("<div class='modal-content'></div>").appendTo(modalDialogObj);
					var modalHeaderObj = $("<div class='modal-header'></div>").appendTo(modalContentObj);
						var modalCloseBtn = $('<button type="button" class="close" data-dismiss="modal">&times;</button>').on("click", killModal);
						modalCloseBtn.appendTo(modalHeaderObj);
						if (typeof closeButton.btnFunction == "function") modalCloseBtn.on("click",closeButton.btnFunction);
						var modalTitleObj = $("<h2></h2>").text(modalTitle).appendTo(modalHeaderObj);
					var modalBodyObj = $("<div class='modal-body'></div>").html(modalContent).appendTo(modalContentObj);
					var modalFooterObj = $("<div class='modal-footer'></div>").appendTo(modalContentObj);
						var modalCloseBtnFooter = $("<button type='button' class='btn btn-" + closeButton.btnType + "' data-dismiss='modal'></button>").html(closeButton.btnText)
						modalCloseBtnFooter.on("click", killModal);
						if (typeof closeButton.btnFunction == "function") modalCloseBtnFooter.on("click",closeButton.btnFunction);
		
		if (typeof modalButtons != "undefined") {
			for (var i=0; i<modalButtons.length; i++) {
				var newFooterButton = $("<button type='button' class='btn " + (typeof modalButtons[i].btnType != "undefined" ? "btn-"+modalButtons[i].btnType : "") + "' data-dismiss='modal'></button>").html(modalButtons[i].btnText).appendTo(modalFooterObj);
				if (modalButtons[i].keepModalOpen !== true) newFooterButton.on("click", killModal);
				if (typeof modalButtons[i].btnFunction == "function") newFooterButton.on("click",modalButtons[i].btnFunction);
			}
		}
		
						modalCloseBtnFooter.appendTo(modalFooterObj);
			
		modalContainerObj.appendTo(this.config.modalContainerObj);
		this.config.modalContainerObj.removeClass("hidden");
		this.config.modalContainerObj.off()
		this.config.modalContainerObj.on("click",closeButton.btnFunction);
		this.config.modalContainerObj.on("click", killModal );
	}
}




// Preset Functions

function killModal(evt) {
	wNiver.feedBackZator.config.modalContainerObj.find(".modal").remove();
	wNiver.feedBackZator.config.modalContainerObj.addClass("hidden");
	return preventEventPropagation(evt)
}
	

function yesNoMaybeModal() {
	wNiver.feedBackZator.displayModal("Sim, não ou talvez?","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	{btnFunction:function() { verbose("Não"); }, btnText:"Não", btnType:"danger" },
	[
	   {btnFunction:function() { verbose("Talvez"); }, btnText:"Talvez", btnType:"default" },
	   {btnFunction:function() { otherModal() }, btnText:"Sim", btnType:"success" }
	]
	)
}

function otherModal() {
	wNiver.feedBackZator.displayModal("Outra modal aberta em cima da outra","lol",
	
	{}, [{btnFunction:function() { verbose("Sim"); }, btnText:"Ok", btnType:"info" }])
}

function testMessage() {
	//wNiver.feedBackZator.clearMessages();
	wNiver.feedBackZator.displayMessage("<strong>Sucesso!</strong> sua classe de mensagens funciona muito bem.","success",8000);
}