function ContactFormViewModel() {
	var self = this;
	self.userName = ko.observable("");
	self.enableDetails = function() {
		if (self.userName().length > 5) {
    		alert(self.userName());
    	}
        return true;
	};
}

var contactFormViewModel = new ContactFormViewModel();
ko.applyBindings(contactFormViewModel);