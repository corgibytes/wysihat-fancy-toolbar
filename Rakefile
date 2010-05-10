require 'rake'
require 'rake/testtask'
require 'rake/rdoctask'

TOOLBAR_ROOT          = File.expand_path(File.dirname(__FILE__))
TOOLBAR_SRC_DIR       = File.join(TOOLBAR_ROOT, 'src')
TOOLBAR_DIST_DIR      = File.join(TOOLBAR_ROOT, 'dist')

task :default => :dist

desc 'Builds the distribution.'
task :dist => ['sprocketize:prototype', 'sprocketize:wysihat', 'sprocketize:toolbar']

desc 'Remove files created during the build'
task :clean => ['sprocketize:clean']

desc 'Update git submodules'
task :update_submodules do
  system('git submodule init')
  system('git submodule update')
end

namespace :sprocketize do
  task :dist_dir do
    FileUtils.mkdir_p(TOOLBAR_DIST_DIR)
  end
  
  task :clean do
    FileUtils.rm_rf(TOOLBAR_DIST_DIR)
  end
  
  task :toolbar => [:update_submodules, :dist_dir] do
    require File.join(TOOLBAR_ROOT, 'vendor', 'sprockets', 'lib', 'sprockets')
    
    secretary = Sprockets::Secretary.new(
      :root         => File.join(TOOLBAR_ROOT, 'src'),
      :load_path    => [TOOLBAR_SRC_DIR],
      :source_files => ['wysihat/yahoo_toolbar.js']
    )
        
    secretary.concatenation.save_to(File.join(TOOLBAR_DIST_DIR, 'wysihat.yahoo_toolbar.js'))
  end
  
  task :wysihat => [:update_submodules, :dist_dir] do
    require File.join(TOOLBAR_ROOT, 'vendor', 'sprockets', 'lib', 'sprockets')

    wysihat_root = File.join(TOOLBAR_ROOT, 'vendor', 'wysihat')
    wysihat_src_dir = File.join(TOOLBAR_ROOT, wysihat_root, 'src')

    secretary = Sprockets::Secretary.new(
      :root         => File.join(wysihat_root, 'src'),
      :load_path    => [wysihat_src_dir],
      :source_files => ['wysihat.js']
    )

    secretary.concatenation.save_to(File.join(TOOLBAR_DIST_DIR, 'wysihat.js'))
  end

  task :prototype => [:update_submodules, :dist_dir] do
    require File.join(TOOLBAR_ROOT, 'vendor', 'sprockets', 'lib', 'sprockets')

    prototype_root    = File.join(TOOLBAR_ROOT, 'vendor', 'prototype')
    prototype_src_dir = File.join(prototype_root, 'src')

    secretary = Sprockets::Secretary.new(
      :root         => File.join(prototype_root, 'src'),
      :load_path    => [prototype_src_dir],
      :source_files => ['prototype.js']
    )

    secretary.concatenation.save_to(File.join(TOOLBAR_DIST_DIR, 'prototype.js'))
  end
end

namespace :yui2 do
  # note, the yui2 toolbar is packaged as part of the editor
  task :editor => [:update_submodules, :button, :menu, :event, :element, :dom, :yahoo] do 
    build 'vendor/yui2/src/editor'
  end
  
  task :button do
    build 'vendor/yui2/src/button'
  end
  
  task :menu do
    build 'vendor/yui2/src/menu'
  end
  
  task :event do 
    build 'vendor/yui2/src/menu'
  end
  
  task :element do 
    build 'vendor/yui2/src/element'
  end
  
  task :dom do 
    build 'vendor/yui2/src/dom'
  end
  
  task :yahoo do 
    build 'vendor/yui2/src/yahoo'
  end
end

def build(path)
  Dir.chdir(path) { ant :all }
end

def ant(target)
  system("ant #{target}")
end