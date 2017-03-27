/*************************************************************************
 * Gulp configuration file (gulp.config.js)
 *************************************************************************
 * @description
 * Configuration file used by gulpfile.js to use variables, consts, etc.
 * 
 * @author
 * 
 *************************************************************************/
module.exports = function () {

    // Config Returned Object to be used in gulpfile.js
    var config = {

        UserConfig: {
            "dev": {
                userName: "spadmin",
                passWord: "ifactory123!@#",
                domain: "sp13dev",
                siteUrl: "http://testeapp.sp13dev.com/sites/exemplo/"
            }
        },
        SPConfig: {
            UploadSPFolderJS: "_catalogs/masterpage/branding/js",
        }
    };
    return config;
};

