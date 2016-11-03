const experimentWarning = {
    props: ['msg'],
    data: function() {
        return {isChrome: navigator.appVersion && navigator.appVersion.indexOf('Chrome/') > -1};
    },
    template:
        `<div v-if="!isChrome" class="panel panel-danger">
            <div class="panel-heading">WARNING!</div>
            <div class="panel-body">
                <p>{{msg}}</p>
            </div>
        </div>`
};

export {experimentWarning};