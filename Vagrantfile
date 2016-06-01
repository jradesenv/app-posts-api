Vagrant.configure("2") do |config|
  config.vm.box = "precise32"
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"
  config.vm.network :forwarded_port, guest: 3001, host: 3001
  config.vm.provision "shell", inline: "sudo apt-get update"
  config.vm.provision :shell, :path => "bootstrap.sh", run: "always"
end