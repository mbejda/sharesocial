define(['jquery'],function ($) {
var ajaxHelper = function() {
    var self = this;
    self.url = "";
    self.type = "POST";
    self.data = {};
    self.dataType = 'json';
    self.beforeSend = '';
    self.always = '';

    this.setUrl = function(u)
    {
        self.url = u;
        return self;
    }
    this.setType = function(t)
    {
        self.type = t;

        return self;

    }
    this.setDataType = function(t)
    {
        self.dataType = t;

        return this;

    }
    this.setData = function(data)
    {
      console.log(data)
        self.data = {data : data};
        return self;
    }
    this.setBeforeSend = function(cb)
    {
        self.beforeSend = cb;
        return self;
    }
    this.setAlways = function(cb)
    {
        self.always = cb;
        return self;
    }
    this.formToJSON = function(selector)
    {
        var form = {};
        $(selector).find('input').each( function() {
            var self = $(this);
            var name = self.attr('name');
            if (form[name]) {
                form[name] = form[name] + ',' + self.val();
            }
            else {
                form[name] = self.val();
            }
        });

        return form;
    }

    this.go = function(){
        return $.ajax({
            url : self.url,
            type: self.type,
            data : self.data,
            dataType : self.dataType,
        });
    };
    return this;
};

return ajaxHelper;
})
