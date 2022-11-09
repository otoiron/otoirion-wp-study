#!/bin/sh

DIRPATH=`pwd`
rm -r $DIRPATH/themes/otoirion-study-theme/assets
echo $DIRPATH
ln -s $DIRPATH/dist/assets $DIRPATH/themes/otoirion-study-theme/assets