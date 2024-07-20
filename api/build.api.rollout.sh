IMAGE_TAG=$REPOSITORY:$VERSION
for COMMAND in "$@"
do
  case "${COMMAND}"
  in
     "staging")
      APP_BUILD_ID=1
      TEMPLATE_VERSION=1
      APP_BASE_URL=https://api.zmoozy.com
      VERSION=1.0.$APP_BUILD_ID
      PROJECTID=c5hpiv70.c1.bhs5.container-registry.ovh.net/zmoozy
      REPOSITORY=$PROJECTID/instagram_platform
      IMAGE_TAG=$REPOSITORY:$VERSION
      ENV=PROD
    ;;
    "prod")
      APP_BUILD_ID=1
      TEMPLATE_VERSION=1
      IS_PROD=1
      VERSION=1.0.$APP_BUILD_ID
      PROJECTID=zmoozy
      APP_BASE_URL=https://api.bot.zmooz.com
      REPOSITORY=c5hpiv70.c1.bhs5.container-registry.ovh.net/$PROJECTID/instagram_platform
      IMAGE_TAG=$REPOSITORY:$VERSION
      GROUP_NAME=instagram_platform-instance-group
      TEMPLATE_NAME=instagram_platform-template
      ROLLOUT_PRIORITY=false
      ENV=PROD
    ;;
    "removeall")
      docker images -a |  grep $PROJECTID | awk '{print $3}' | xargs docker rmi
      ;;
    "build-base")
      echo BUILD IMAGE: $IMAGE_TAG
      docker build --no-cache \
            -f Dockerfile.base -t $IMAGE_TAG .
    ;;
    "build")
      echo BUILD IMAGE: $IMAGE_TAG
      docker build \
            --build-arg APP_BUILD_ID=$APP_BUILD_ID \
            --build-arg APP_BASE_URL=$APP_BASE_URL \
            --build-arg ROLLOUT_PRIORITY=$ROLLOUT_PRIORITY \
            --build-arg ENV=PROD \
            -f Dockerfile -t $IMAGE_TAG .
    ;;
    "push")
      docker push $REPOSITORY:$VERSION
    ;;
    "deploy")
  esac
done
echo DONE AND DONE
