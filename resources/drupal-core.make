api = 2
core = 7.x

projects[drupal][type] = "core"
projects[drupal][version] = "7.54"

; AJAX callbacks not properly working with the language url suffix.
; https://webgate.ec.europa.eu/CITnet/jira/browse/MULTISITE-4268
; https://webgate.ec.europa.eu/CITnet/jira/browse/NEXTEUROPA-11656
; https://www.drupal.org/node/565808
projects[drupal][patch][] = patches/ajax-js_url_suffix.patch

; node_access filters out accessible nodes when node is left joined.
; https://webgate.ec.europa.eu/CITnet/jira/browse/MULTISITE-2689
; https://webgate.ec.europa.eu/CITnet/jira/browse/NEXTEUROPA-11805
; https://www.drupal.org/node/1349080
projects[drupal][patch][] = patches/node-node_access_views_relationship-1349080.patch

; Make sure that _locale_parse_js_file() never runs a file_get_contents() on a remote file.
; https://webgate.ec.europa.eu/CITnet/jira/browse/NEXTEUROPA-12269
; https://www.drupal.org/node/2762865
; https://www.drupal.org/node/2385069
projects[drupal][patch][] = https://www.drupal.org/files/issues/2385069-19-drupal7-do-not-test.patch

; Move local configuration directives out of the Git repository.
; https://webgate.ec.europa.eu/CITnet/jira/browse/NEXTEUROPA-3154
projects[drupal][patch][] = patches/default-settings-php-include-local-settings.patch

; Allow management of visibility for pseudo-fields.
; https://www.drupal.org/node/1256368
; https://webgate.ec.europa.eu/CITnet/jira/browse/MULTISITE-3996
; Also requires a patch for i18n issue https://www.drupal.org/node/1350638,
; you can find it in multisite_drupal_standard.make.
projects[drupal][patch][] = https://www.drupal.org/files/issues/drupal-n1256368-91.patch

; Allow DRUPAL_MAXIMUM_TEMP_FILE_AGE to be overridden.
; Please read carefully: https://www.drupal.org/node/1399846?page=1#comment-11718181
; The hook_update_N() has been removed from the patch, it needs to be added somewhere else to be consistent.
; https://webgate.ec.europa.eu/CITnet/jira/browse/MULTISITE-5641
projects[drupal][patch][] = https://www.drupal.org/files/issues/cleanup-files-1399846-306_0.patch

; Make sure drupal_add_js marks files as external when no type is specified and is_external is true:
; https://www.drupal.org/node/2697611
; https://webgate.ec.europa.eu/CITnet/jira/browse/NEXTEUROPA-9874
projects[drupal][patch][] = https://www.drupal.org/files/issues/drupal_add_js_sanitize_external-2697611-4.patch

; Document $attributes, $title_attributes, and $content_attributes template variables
; https://www.drupal.org/node/569362
; https://webgate.ec.europa.eu/CITnet/jira/browse/NEPT-64
projects[drupal][patch][] = https://www.drupal.org/files/issues/drupal-doc-theme-attributes-d7-569362-53.patch

; Fix empty label on validation error message for multiple required textfield.
; https://www.drupal.org/node/980144#comment-11695545 
; https://webgate.ec.europa.eu/CITnet/jira/browse/NEPT-224
projects[drupal][patch][] = https://www.drupal.org/files/issues/980144-98_0.patch
