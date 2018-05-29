var JsonRenderer = {
    render: function(json) {
        var rendered = this.renderJsonElement(json, 0);

        var child = document.createElement("div");
        child.classList.add("json-renderer-root");

        var row = document.createElement("div");
        row.classList.add("json-renderer-row");

        row.appendChild(rendered.value);
        child.appendChild(row);

        if (rendered.child !== undefined) {
            child.appendChild(rendered.child);
        }
        
        return child;
    },
    renderJsonElement: function(element) {
        if (element === null) {
            return this.renderJsonNull();
        }

        if (typeof(element) == 'string') {
            return this.renderJsonString(element);
        }

        if (typeof(element) == 'number') {
            return this.renderJsonNumber(element);
        }

        if (typeof(element) == 'boolean') {
            return this.renderJsonBoolean(element);
        }

        if (element.constructor == Array) {
            return this.renderJsonArray(element);
        }

        if (element.constructor == Object) {
            return this.renderJsonObject(element);
        }
    },
    renderJsonArray: function(element) {
        var child = document.createElement("div");
        child.classList.add("json-renderer-child");
        for (var i=0; i<element.length; i++) {
            var rendered = this.renderJsonElement(element[i]);
        
            var row = document.createElement("div");
            row.classList.add("json-renderer-row");
            row.appendChild(this.getThemeKey(i));
            row.appendChild(this.getThemeSeparator());
            row.appendChild(rendered.value);
            child.appendChild(row);

            if (rendered.child !== undefined) {
                row.classList.add("json-renderer-toggle")
                row.classList.add("open")
                $(row).click(function() {
                    this.classList.toggle("open")
                    $(this).next().eq(0).toggle();
                });
                child.appendChild(rendered.child);
            }
        }

        return {value:this.getThemeArrayCount(element.length), child:child};
    },
    renderJsonObject: function(element) {
        var child = document.createElement("div");
        child.classList.add("json-renderer-child");
        var parentThis = this;
        Object.keys(element).forEach(function eachKey(key) {
            var rendered = parentThis.renderJsonElement(element[key]);

            var row = document.createElement("div");
            row.classList.add("json-renderer-row");
            
            row.appendChild(parentThis.getThemeKey(key));
            row.appendChild(parentThis.getThemeSeparator());
            row.appendChild(rendered.value);
            child.appendChild(row);

            if (rendered.child !== undefined) {
                row.classList.add("json-renderer-toggle")
                row.classList.add("open")
                $(row).click(function() {
                    this.classList.toggle("open")
                    $(this).next().eq(0).toggle();
                });
                child.appendChild(rendered.child);
            }
        });

        return {value:this.getThemeObjectCount(Object.keys(element).length), child:child};
    },
    renderJsonNull: function() {
        return {value:this.getThemeNull()};
    },
    renderJsonString: function(string) {
        return {value:this.getThemeString(JSON.stringify(string))};
    },
    renderJsonNumber: function(number) {
        return {value:this.getThemeNumber(JSON.stringify(number))};
    },
    renderJsonBoolean: function(boolean) {
        return {value:this.getThemeBoolean(JSON.stringify(boolean))};
    },
    getThemeKey: function(key) {
        var item = document.createElement("span")
        item.classList.add("json-renderer-key");
        item.appendChild(document.createTextNode(key));

        return item;
    },
    getThemeValue: function(type, value) {
        var item = document.createElement("span")
        item.classList.add("json-renderer-"+type);
        item.appendChild(document.createTextNode(value));

        return item;
    },
    getThemeArrayCount: function(count) {
        var item = document.createElement("span")
        item.classList.add("json-renderer-count");
        item.appendChild(document.createTextNode("Array["+count+"]"));

        return item;
    },
    getThemeObjectCount: function(count) {
        var item = document.createElement("span")
        item.classList.add("json-renderer-count");
        item.appendChild(document.createTextNode("Object{"+count+"}"));

        return item;
    },
    getThemeNull: function() {
        return this.getThemeValue("null", "null");
    },
    getThemeString: function(value) {
        return this.getThemeValue("string", value);
    },
    getThemeNumber: function(value) {
        return this.getThemeValue("number", value);
    },
    getThemeBoolean: function(value) {
        return this.getThemeValue("boolean", value);
    },
    getThemeSeparator: function() {
        var item = document.createElement("span")
        item.classList.add("json-renderer-separator");
        item.appendChild(document.createTextNode(":"));

        return item;
    }
}
